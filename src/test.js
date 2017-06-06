import React from 'react'
import ReactDom from 'react-dom'
import Pagination from './pagination'

import 'bootstrap/dist/css/bootstrap.css'
// import '../tests/styles/pages.less'

ReactDom.render(
    <Pagination
        className="paginate "
        total={1000}
        onChange={(page, pageSize) => {
            console.log(page)
        }}
    />,
    document.getElementById('pagination')
)
