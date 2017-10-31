global.__base = __dirname + '/';

let UpdateModule = require("../local_node_modules/controller/UpdateModule.js");
var SymptomDao = require("../local_node_modules/dao/SymptomDao.js");
var TextMiningModule= require("../local_node_modules/controller/TextMiningModule.js");
var NCBIAPIModule= require("../local_node_modules/controller/NCBIAPIModule.js");

console.log("231"<"2426");
console.log("2"<"2426");
console.log("231"<"2426");

UpdateModule.noUpdateRareDiseaseWorkflow();

/*SymptomDao.getSymptoms(
    function(symptoms)
    {
        var realSymptoms = symptoms.map(function(currentValue, index, arr){return currentValue.name});
        TextMiningModule.giveSymptomsWithOccurrence(
            realSymptoms,
            "Objective To explore the feasibility of high-throughput\n" +
            " massively parallel genomic DNA sequencing technology for the noninvasive\n" +
            " prenatal detection of fetal sex chromosome aneuploidies (SCAs). Methods The\n" +
            " study enrolled pregnant women who were prepared to undergo noninvasive\n" +
            " prenatal testing (NIPT) in the second trimester. Cell-free fetal DNA (cffDNA)\n" +
            " was extracted from the mother's peripheral venous blood and a high-throughput\n" +
            " sequencing procedure was undertaken. Patients identified as having\n" +
            " pregnancies associated with SCAs were offered prenatal fetal chromosomal\n" +
            " karyotyping. Results The study enrolled 10 275 pregnant women who were\n" +
            " prepared to undergo NIPT. Of these, 57 pregnant women (0.55%) showed fetal\n" +
            " SCA, including 27 with Turner syndrome (45,X), eight with Triple X syndrome\n" +
            " (47,XXX), 12 with Klinefelter syndrome (47,XXY) and three with 47,XYY.\n" +
            " Thirty-three pregnant women agreed to undergo fetal karyotyping and 18 had\n" +
            " results consistent with NIPT, while 15 patients received a normal karyotype\n" +
            " result. The overall positive predictive value of NIPT for detecting SCAs was\n" +
            " 54.54% (18/33) and for detecting Turner syndrome (45,X) was 29.41% (5/17).\n" +
            " Conclusion NIPT can be used to identify fetal SCAs by analysing cffDNA using\n" +
            " massively parallel genomic sequencing, although the accuracy needs to be\n" +
            " improved particularly for Turner syndrome (45,X).",
            function(symptomsWithOccurence)
            {
                console.log(symptomsWithOccurence);
            }
        );
    }
);*/

