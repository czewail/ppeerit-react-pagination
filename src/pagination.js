import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import 'font-awesome/css/font-awesome.css'

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: props.defaultCurrent,
        }
    }

    // 是否还有上一页
    _hasPrev = () => {
        return this.state.current > 1
    }
    // 是否还有下一页
    _hasNext = () => {
        return this.state.current < this._getPages()
    }
    // 上一页
    _prev = () => {
        if (this._hasPrev()) {
            this._handleChange(this.state.current - 1)
        }
    }
    // 下一页
    _next = () => {
        if (this._hasNext()) {
            this._handleChange(this.state.current + 1)
        }
    }
    // 跳转
    _jump = (page) => {
        if (page !== this.state.current) {
            this._handleChange(page)
        }
    }
    // 页面跳转
    _handleChange = (page) => {
        const {pageSize} = this.props
        this.setState({
            current: page
        })
        if (this.props.onChange) {
            this.props.onChange(page, pageSize)
        }
    }
    // 获取页数
    _getPages = () => {
        const {total, pageSize} = this.props
        return Math.ceil(total / pageSize)
    }

    // 8页以下
    _renderLessPagination = (pages) => {
        let pageList = []
        pageList.push(this._renderPrev())
        for (let i = 1; i <= pages; i++) {
            pageList.push(this._renderPage(i))
        }
        pageList.push(this._renderNext())
        return pageList
    }
    // 8页以上
    _renderMorePagination = (pages) => {
        let pageList = []
        const {current} = this.state
        pageList.push(this._renderPrev())
        if (current >= 4 && current <= pages - 3) {
            pageList.push(this._renderPage(1))
            pageList.push(this._renderOmit('front'))
            for (let i = current - 1; i <= current + 1; i++) {
                pageList.push(this._renderPage(i))
            }
            pageList.push(this._renderOmit('back'))
            pageList.push(this._renderPage(pages))
        } else if (current < 4) {
                for (let i = 1; i <= 4; i++) {
                    pageList.push(this._renderPage(i))
                }
                pageList.push(this._renderOmit('back'))
                pageList.push(this._renderPage(pages))
        }else if(current > pages - 3){
            pageList.push(this._renderPage(1))
            pageList.push(this._renderOmit('front'))
            for (let i = pages - 3; i <= pages; i++){
                pageList.push(this._renderPage(i))
            }
        }
        pageList.push(this._renderNext())
        return pageList
    }

    // 渲染上一页
    _renderPrev = () => {
        const prevDisable = !this._hasPrev()
        return (
            <li key="prev" onClick={this._prev} className={classNames('prev', {
                'disabled': prevDisable
            })}>
                <a href="#">
                    <i className={classNames('fa', 'fa-angle-left')}></i>
                </a>
            </li>
        )
    }

    // 渲染页码
    _renderPage = (page) => {
        const {current} = this.state
        return (
            <li key={page} onClick={() => this._jump(page)} className={classNames({
                'active': current === page
            })}>
                <a href="#">{page}</a>
            </li>
        )
    }
    // 渲染省略
    _renderOmit = (key) => {
        return (
            <li key={key} onClick={() => this._jump(page)} className={classNames('disabled')}>
                <a href="#">...</a>
            </li>
        )
    }
    // 渲染下一页
    _renderNext = () => {
        const nextDisable = !this._hasNext()
        return (
            <li key="next" onClick={this._next} className={classNames('next', {
                'disabled': nextDisable
            })}>
                <a href="#">
                    <i className={classNames('fa', 'fa-angle-right')}></i>
                </a>
            </li>
        )
    }
    // 渲染组件
    render() {
        const bufferPages = 3
        const {className, total, pageSize} = this.props
        const paginationClassNames = classNames(className)
        const pages = this._getPages()

        let paginationComponent = null
        // 5页以下
        if (pages <= 5 + bufferPages) {
            paginationComponent = this._renderLessPagination(pages)
        } else {
            paginationComponent = this._renderMorePagination(pages)
        }

        return (
            <div className={paginationClassNames}>
                <ul>
                    {paginationComponent}
                </ul>
            </div>
        )
    }
}
Pagination.propTypes = {
    className: PropTypes.string,
    total: PropTypes.number,
    defaultCurrent: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func
}
Pagination.defaultProps = {
    defaultCurrent: 1,
    pageSize: 10,
    total: 0
}

export default Pagination