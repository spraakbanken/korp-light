let queryParams = {
    "corpus" : String(),
    "cqp" : String(),
    "start": 0,
    "end": 1000,
    "default_context": String(),
    "context": [String()],
    "show": [String()],
    "show_struct": "text_author,text_date,text_url,text_title",
    "default_within": "sentence",
    "within": String(),
    "in_order": true,
    "sort": String(),
    "random_seed": Number(),
    "cut": Number(),
    //"cqp#": String(),
    "expand_prequeries": Boolean(),
    "incremental": Boolean(),
    "query_data": String(),
}

export default queryParams;