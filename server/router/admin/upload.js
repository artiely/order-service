const qiniu = require('qiniu')
const sha1 = require('sha1')

// 七牛提供的公钥
const accessKey = 'We6bt5rwZIa1EJibDeFwTYSmoSSwfcIjr6y9rzL4'
// 七牛提供的私钥
const secretKey = 'dFnj6hQVkPosxE-2Ro6M8k0w_SuJgVs2ScaCU7as'
// 存储空间名
const bucketName = 'artiely'

module.exports.upload = (req, res) => {
  // 文件名
  const fileName = `${sha1(req.query.fileName)}.${req.query.fileName.split('.').pop()}`

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: `${bucketName}:${fileName}`,
    expires: 24*60*60 * 1000 * 1,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  })

  // 上传凭证
  const uploadToken = putPolicy.uploadToken(mac)

  res.send({
    code: 0,
    desc: 'ok',
    result: {
      bucketName,
      fileName,
      uploadToken
    }
  })
}