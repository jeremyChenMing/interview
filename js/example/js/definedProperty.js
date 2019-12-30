const con = document.getElementById('container')
{/* <input type="text" id="input" /> */}
let asr = document.createElement('input');
let tt = document.createElement('span');
asr.id = 'input'
tt.id = 'span'
asr.type = 'text'

con.appendChild(asr)
con.appendChild(tt)

let obj = {};
let input = document.getElementById('input');
let span = document.getElementById('span');
// 数据劫持
Object.defineProperty(obj, 'text', {
    configurabel: true,
    enumerable: true,
    get() {
        console.log('数据获取')
    },
    set(val) {
        console.log(val)
        input.value = val
        span.innerText = val
    }
})
// 输入监听
input.addEventListener('keyup', function(e) {
    obj.text = e.target.value
})