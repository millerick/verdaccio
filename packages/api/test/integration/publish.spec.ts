import { HTTP_STATUS } from '@verdaccio/core';
import supertest from 'supertest';
import { API_ERROR, API_MESSAGE, HEADER_TYPE, HEADERS } from '@verdaccio/core';
import { generatePackageMetadata } from '@verdaccio/helper';
import { $ResponseExtend, $RequestExtend } from '../../types/custom';
import { initializeServer, publishVersion } from './_helper';

const mockApiJWTmiddleware = jest.fn(
  () =>
    (req: $RequestExtend, res: $ResponseExtend, _next): void => {
      req.remote_user = { name: 'foo', groups: [], real_groups: [] };
      _next();
    }
);

jest.mock('@verdaccio/auth', () => ({
  Auth: class {
    apiJWTmiddleware() {
      return mockApiJWTmiddleware();
    }
    allow_access(_d, f_, cb) {
      cb(null, true);
    }
    allow_publish(_d, f_, cb) {
      cb(null, true);
    }

    allow_unpublish(_d, f_, cb) {
      cb(null, true);
    }
  },
}));

// const mockStorage = jest.fn(() => {
// 	const { Storage } = jest.requireActual('@verdaccio/store');
// 	return {
// 		Storage: class extends Storage {
// 			addPackage(name, metadata, cb) {
// 				super.addPackage(name, metadata, cb);
// 			}
// 		}
// 	};
// });

// jest.mock('@verdaccio/store', () => {
// 	const { Storage } = jest.requireActual('@verdaccio/store');
// 	return ({
// 		Storage: class extends Storage {
// 			addPackage(name, metadata, cb) {
// 				// super.addPackage(name, metadata, cb);
// 				return mockStorage(name, metadata, cb);
// 			}
// 		}
// 	})
// });

describe('publish', () => {
  describe('handle invalid publish formats', () => {
    const pkgName = 'test';
    const pkgMetadata = generatePackageMetadata(pkgName, '1.0.0');
    test.skip('should fail on publish a bad _attachments package', async (done) => {
      const app = await initializeServer('publish.yaml');
      return supertest(app)
        .put(`/${encodeURIComponent(pkgName)}`)
        .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
        .send(
          JSON.stringify(
            Object.assign({}, pkgMetadata, {
              _attachments: {},
            })
          )
        )
        .set('accept', HEADERS.GZIP)
        .expect(HTTP_STATUS.BAD_REQUEST)
        .then((response) => {
          console.log('response.body', response.body);
          expect(response.body.error).toEqual(API_ERROR.UNSUPORTED_REGISTRY_CALL);
          done();
        });
    });

    test('should fail on publish a bad versions package', async () => {
      const app = await initializeServer('publish.yaml');
      return new Promise((resolve) => {
        supertest(app)
          .put(`/${encodeURIComponent(pkgName)}`)
          .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
          .send(
            JSON.stringify(
              Object.assign({}, pkgMetadata, {
                versions: '',
              })
            )
          )
          .set('accept', HEADERS.GZIP)
          .expect(HTTP_STATUS.BAD_REQUEST)
          .then((response) => {
            console.log('response.body', response.body);
            expect(response.body.error).toEqual(API_ERROR.UNSUPORTED_REGISTRY_CALL);
            resolve(response);
          });
      });
    });
  });

  describe('publish a package', () => {
    test('should publish a package', async () => {
      const app = await initializeServer('publish.yaml');
      return new Promise((resolve) => {
        publishVersion(app, 'publish.yaml', 'foo', '1.0.0')
          .expect(HTTP_STATUS.CREATED)
          .then((response) => {
            expect(response.body.ok).toEqual(API_MESSAGE.PKG_CREATED);
            resolve(response);
          });
      });
    });

    test('should publish a new package', async () => {
      const pkgName = 'test';
      const pkgMetadata = generatePackageMetadata(pkgName, '1.0.0');
      const app = await initializeServer('publish.yaml');
      return new Promise((resolve) => {
        supertest(app)
          .put(`/${encodeURIComponent(pkgName)}`)
          .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
          .send(
            JSON.stringify(
              Object.assign({}, pkgMetadata, {
                _attachments: null,
              })
            )
          )
          .set('accept', HEADERS.GZIP)
          .expect(HTTP_STATUS.CREATED)
          .then((response) => {
            expect(response.body.ok).toEqual(API_MESSAGE.PKG_CREATED);
            resolve(response);
          });
      });
    });

    test('should publish a new package with no readme', async () => {
      const pkgName = 'test';
      const pkgMetadata = generatePackageMetadata(pkgName, '1.0.0');
      const app = await initializeServer('publish.yaml');
      return new Promise((resolve) => {
        supertest(app)
          .put(`/${encodeURIComponent(pkgName)}`)
          .set(HEADER_TYPE.CONTENT_TYPE, HEADERS.JSON)
          .send(
            JSON.stringify(
              Object.assign({}, pkgMetadata, {
                versions: {
                  ['1.0.0']: {
                    readme: null,
                  },
                },
              })
            )
          )
          .set('accept', HEADERS.GZIP)
          .expect(HTTP_STATUS.CREATED)
          .then((response) => {
            expect(response.body.ok).toEqual(API_MESSAGE.PKG_CREATED);
            resolve(response);
          });
      });
    });
  });

  test('should fails on publish a duplicated package', async () => {
    const app = await initializeServer('publish.yaml');
    await publishVersion(app, 'publish.yaml', 'foo', '1.0.0');
    return new Promise((resolve) => {
      publishVersion(app, 'publish.yaml', 'foo', '1.0.0')
        .expect(HTTP_STATUS.CONFLICT)
        .then((response) => {
          console.log('response.body', response.body);
          expect(response.body.error).toEqual(API_ERROR.PACKAGE_EXIST);
          resolve(response);
        });
    });
  });

  describe('unpublish a package', () => {
    let app;

    beforeEach(async () => {
      app = await initializeServer('publish.yaml');
      await publishVersion(app, 'publish.yaml', 'foo', '1.0.0');
    });

    test('should unpublish a package', () => {});
  });

  describe('star a package', () => {});
});
