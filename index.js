window.addEventListener("load", () => {
    document.querySelectorAll("a").forEach(a => {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });
});

const data = [
    {
        "key": "Author",
        "value": [
            {
                "src": "https://www.semanticscholar.org/paper/Graph-n-grams-for-Scientific-Workflow-Similarity-Wiegandt-Starlinger/c4dd57f4b15e846ff98b6574dcbb682dbd7bd9cf",
                "title": "Graph n-grams for Scientific Workflow Similarity Search.",
                "author": "Wiegandt, David Luis, et al.",
                "journal": "LWDA. 2016."
            }
        ]
    },
    {
        "key": "Co-Author",
        "value": [
            {
                "src": "https://www.sciencedirect.com/science/article/abs/pii/S2214579620300010",
                "title": "PatSeg: A Sequential Patent Segmentation Approach.",
                "author": "Habibi, Maryam, et al.",
                "journal": "Big Data Research 19-20 (2020): 100133."
            },
            {
                "src": "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2958-3",
                "title": "VIST - A Variant-Information Search Tool for precisiononcology.",
                "author": "Ševa, Jurica,et al.",
                "journal": "BMC bioinformatics 20.1 (2019): 429."
            },
            {
                "src": "https://ascopubs.org/doi/10.1200/PO.18.00371",
                "title": "Comparative Analysis of Public Knowledge Bases for Precision Oncology.",
                "author": "Pallarz, Steffen, et al.",
                "journal": "JCO Precision Oncology 3 (2019): 1-8."
            },
            {
                "src": "https://pubmed.ncbi.nlm.nih.gov/28881963/",
                "title": "Deep learning with word embeddings improves biomedical named entity recognition.",
                "author": "Habibi, Maryam, et al.",
                "journal": "Bioinformatics 33.14 (2017): i37-i48."
            },
            {
                "src": "https://www.semanticscholar.org/paper/Recognizing-chemicals-in-patents%3A-a-comparative-Habibi-Wiegandt/18ec62911381f913918711ac57dcdc4fd9f5845c",
                "title": "Recognizing chemicals in patents: a comparative analysis.",
                "author": "Habibi,Maryam, et al.",
                "journal": "Journal of cheminformatics 8.1 (2016): 59."
            },
            {
                "src": "https://www.semanticscholar.org/paper/Performance-of-Gene-Name-Recognition-Tools-on-Habibi-Wiegandt/06b2d2ab672148bd60685d942ab8b2dded2558ea",
                "title": "Performance of Gene Name Recognition Tools on Patents.",
                "author": "Habibi,Maryam, et al.",
                "journal": "SMBM. 2016."
            }
        ]
    }
];