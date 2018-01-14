// import conf from '../../config'
var isProduction = process.env.NODE_ENV === 'production'
var _ip = null
if (isProduction) {
  _ip = null
  console.log('%c 如果你看到这条 log , 说明当前是生产环境', 'font-size:14px;color:#f00;background:#000')
} else {
  _ip = 'ws://192.168.199.162:9093'
  console.log('%c 如果你看到这条 log , 说明当前是开发环境', 'font-size:14px;color:#f00;background:#000')
}
export { _ip }
