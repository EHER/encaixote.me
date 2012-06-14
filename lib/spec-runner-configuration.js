(function() {
 var jasmineEnv = jasmine.getEnv();
 jasmineEnv.updateInterval = 1000;

 var trivialReporter = new jasmine.TrivialReporter();

 jasmineEnv.addReporter(trivialReporter);

 jasmineEnv.specFilter = function(spec) {
 return trivialReporter.specFilter(spec);
 };

 var currentWindowOnload = window.onload;

 window.onload = function() {
 if (currentWindowOnload) {
 currentWindowOnload();
 }
 execJasmine();
 };

 function execJasmine() {
     jasmineEnv.execute();
 }

 var console_reporter = new jasmine.ConsoleReporter();
 jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
 jasmine.getEnv().addReporter(console_reporter);
 jasmine.getEnv().execute();
})();
