// :((((
if(!window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = function(cb){
    for(let i=0;i<this.length;i++){
      cb(this[i])
    }
  }
}
if(window.scrollY===undefined) {
  window.addEventListener('scroll',()=>{
    window.scrollY = window.pageYOffset
  })
}