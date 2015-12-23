/**
 * Created by Alexandr Krivonos
 * Date: 12/14/15
 */

(function() {
    angular.module('restApp', ['ngSanitize', 'oitozero.ngSweetAlert'])

        .controller('restCtrl', ['$scope', '$http', '$sanitize', 'SweetAlert',
            function($scope, $http, $sanitize, SweetAlert){

                $scope.restHttp = function(data){
                    if(data.method) {
                        if(data.method == "GET"){
                            // GET

                            $http.get("/frontend/ajax/rest.php", {
                                    params: {
                                        get: ((angular.isNumber(data.val)) ? data.val : "list"), // edit or list
                                        dev: 1 // dev for development
                                    }
                                }).then(function (response) {
                                // 200-299

                                // some actions with edit or list element
                                // response.data.ajax_response_get

                                SweetAlert.swal(data.method,
                                    "Status response: " + response.status + "\n Ajax response: " + response.data.ajax_response
                                        + "\n" + response.data.ajax_response_detail,
                                    "success");

                            }, function (response) {
                                // error status(400-499) and other error

                                SweetAlert.swal(data.method,
                                    "Status response: " + response.status + "\n" + response.data.ajax_response_detail,
                                    "error");
                            });

                        }else{
                            // HEAD, POST, PUT, PATCH, DELETE, OPTIONS

                            $http({
                                method: data.method,
                                url: "/frontend/ajax/rest.php",
                                data: {input_data: $sanitize(data.val)},
                                // for development
                                params: {dev: 1}

                            }).then(function (response) {
                                // 200-299

                                var ajax_ans = (response.data.ajax_response) ? "\n Ajax response: " + response.data.ajax_response : "";
                                var input_txt = (response.data.ajax_response_detail) ? "\n" + response.data.ajax_response_detail : "";

                                SweetAlert.swal(data.method,
                                    "Status response: " + response.status + ajax_ans + input_txt,
                                    "success");

                            }, function (response) {
                                // error status(400-499) and other error

                                var input_txt = (response.data.ajax_response_detail) ? "\n" + response.data.ajax_response_detail : "";
                                SweetAlert.swal(data.method,
                                    "Status response: " + response.status + input_txt,
                                    "error");
                            });
                        }
                    }
                };
        }]);
})();