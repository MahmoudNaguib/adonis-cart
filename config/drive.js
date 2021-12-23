'use strict'

const Env = use('Env')

const Helpers = use('Helpers')


module.exports = {
  disk: Env.get('DRIVE_DISK'),
  default: 'local',
  disks: {
    local: {
      driver: 'local',
      visibility: 'public',
      root: Helpers.tmpPath('uploads'),
      basePath: '/uploads',
      serveAssets: true,
    },
    s3: {
      driver: 's3',
      visibility: 'public',
      key: Env.get('S3_KEY'),
      secret: Env.get('S3_SECRET'),
      region: Env.get('S3_REGION'),
      bucket: Env.get('S3_BUCKET'),
      endpoint: Env.get('S3_ENDPOINT'),
    },
  }

}
