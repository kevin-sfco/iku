var defaultTarget = 'https://api-staging-iku.fabioarias.co/';
module.exports = [
{
   context: ['/login/**'],
   target: defaultTarget,
   changeOrigin: true,
}
];