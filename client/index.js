function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var colors = ['red','orange','yellow','green','aqua','blue','purple','pink','brown','white'];
buf.push("<html><head><meta charset=\"UTF-8\"/><title>Drawing Pad 2.0</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><link rel=\"stylesheet\" href=\"css/normalize.css\"/><link rel=\"stylesheet prefetch\" href=\"https://fonts.googleapis.com/css?family=Comfortaa|Open+Sans|Montserrat\"/><link rel=\"stylesheet\" href=\"css/style.css\"/></head><body><div class=\"editor\"><canvas id=\"cdraw\"></canvas><canvas id=\"cfg\"></canvas></div><div class=\"controls\"><div class=\"color\"><div class=\"shades\">");
for (var i=0;i<32;i++)
{
buf.push("<div" + (jade.attr("data-color", colors[0], true, false)) + (jade.cls(['shade','shade-'+(i+1)], [null,true])) + "></div>");
}
buf.push("</div><div class=\"hues\">");
for (var i=0;i<10;i++)
{
buf.push("<div" + (jade.attr("data-color", colors[i], true, false)) + (jade.cls(['hue','hue-'+(i+1)], [null,true])) + "></div>");
}
buf.push("</div><div class=\"current\"></div></div><div class=\"brush\"><div class=\"sizes\"><div data-size=\"sm\" class=\"size\"></div><div data-size=\"md\" class=\"size\"></div><div data-size=\"lg\" class=\"size\"></div></div><div class=\"hardness\"></div></div></div><div class=\"cursors\"></div><div class=\"menu\"><div data-item=\"save\" class=\"menu--item\">SAVE</div></div><script src=\"/socket.io/socket.io.js\"></script><script src=\"http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script><script src=\"js/index.js\"></script></body></html>");;return buf.join("");
}