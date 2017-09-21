global.__base = __dirname + '/';

let UpdateModule = require("../local_node_modules/controller/UpdateModule.js");
let NCBIAPIModule = require("../local_node_modules/controller/NCBIAPIModule.js");
var async = require("async");

//UpdateModule.noUpdateRareDiseaseWorkflow();

NCBIAPIModule.callNCBIAPI(
    NCBIAPIModule.getIdsFromSearch,
    [
        "Idiopathic achalasia",
        930,
        //Called when esearch finished and ids acquired
        function(idlist, orphanetID)
        {
            if(idlist != undefined && orphanetID != undefined)
            {
                async.each(
                    idlist,
                    function(id, next)
                    {
                        NCBIAPIModule.callNCBIAPI(
                            NCBIAPIModule.getPublication,
                            [
                                id,
                                function(publication)
                                {
                                    UpdateModule.updateSymptoms(
                                        publication,
                                        orphanetID,
                                        function()
                                        {
                                            next
                                            //console.log("I'm a stupid student");
                                        }
                                    );
                                }
                            ]
                        );
                    },
                    function(err)
                    {
                        if(err)
                        {

                        }
                        else
                        {

                        }
                    }
                );
            }
        }
    ]
);

