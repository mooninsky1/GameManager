
function Range(from,to)
{
    this.from = from;
    this.to = to;
}
Range.prototype = {
    includes:function(a){return (this.from <=a && this.to >=a); },
    foreach:function(f){
        for(var x=this.from; x<=this.to; x++) f(x)
    }
 //   toString: function(){return "("+this.from+"..aa."+this.to+")";}
};
Range.prototype.toString = function(){return "("+this.from+"..aa."+this.to+")";};
var r =  new Range(1,3);
r.includes(2);
r.foreach(console.log);
console.log(r instanceof Range);
