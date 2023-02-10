var defaultTarget = 'https://api-staging-iku.fabioarias.co/';
module.exports = [
{
   context: ['/api/*'],
   target: defaultTarget,
   changeOrigin: true,
   pathRewrite: {"^/api" : ""}
}
];

/* 
const PROXY_CONFIG = {
   "/": {
       "target": "https://api-staging-iku.fabioarias.co/",
       "secure": false,
       "bypass": function (req, res, proxyOptions) {
           if (req.headers.accept.indexOf("html") !== -1) {
               console.log("Skipping proxy for browser request.");
               return "/index.html";
           }
           req.headers["X-Custom-Header"] = "yes";
       }
   }
} */

//module.exports = PROXY_CONFIG;