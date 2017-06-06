# ppeerit-react-pagination

# 安装
```bash
npm i --save ppeerit-react-pagination
```

# 使用
```jsx
import React from 'react'
import Pagination from 'ppeerit-react-pagination'
class MyComponent extents React.Component {
    render() {
        <div>
            //...
            <Pagination
                className="paginate" // 内置paginate样式，需配合bootstrap
                total={100} // 总数
                pageSize={10} // 每页数量
                defaultCurrent={1} // 默认选中页码
                onChange={(page, pageSize) => {
                    // page 当前页码
                    // pageSize 每页总数
                }}
            />
            //...
        </div>
    }
}
```