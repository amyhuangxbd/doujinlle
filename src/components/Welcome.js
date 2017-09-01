import React, { Component } from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import ReactDataSheet from 'react-datasheet'
// Be sure to include styles at some point, probably during your bootstrapping 
import 'react-datasheet/lib/react-datasheet.css'
import Select from 'react-select'
import _ from 'lodash'
import 'ASSET/scss/style.scss'
import 'ASSET/index.css'

/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */


export default class Welcome extends Component {
  constructor (props) {
    super(props)
    this.options = [
      { label: 'Bread', value: 2.35 },
      { label: 'Berries', value: 3.05 },
      { label: 'Milk', value: 3.99 },
      { label: 'Apples', value: 4.35 },
      { label: 'Chicken', value: 9.95 },
      { label: 'Yoghurt', value: 4.65 },
      { label: 'Onions', value: 3.45 },
      { label: 'Salad', value: 1.55 }
    ]
    this.state = {
      grocery: {},
      items: 3
    }
  }

  generateGrid () {
    const groceryValue = (id) => {
      if (this.state.grocery[id]) {
        const {label, value} = this.state.grocery[id]
        return `${label} (${value})`
      } else {
        return ''
      }
    }
    const component = (id) => {
      return (
        <Select
          autofocus
          openOnFocus
          value={this.state && this.state.grocery[id]}
          onChange={(opt) => this.setState({grocery: _.assign(this.state.grocery, {[id]: opt})})}
          options={this.options}
        />
      )
    }
    const total = _.reduce(_.values(this.state.grocery), (res, val, key) => {
      res += (val && val.value) || 0
      return res
    }, 0)
    let rows = [
      [{readOnly: true, colSpan: 2, value: 'Shopping List'}],
      [
        {readOnly: true, value: ''}, 
        { 
          value: 'Grocery Item', 
          component: (
            <div className={'add-grocery'}> Grocery List 
              <div className={'add-button'} onClick={()=>{console.log('add');this.setState({items: this.state.itemitems + 1})}}> add item</div> 
            </div>
          ), 
          forceComponent: true
        }]
    ]
    rows = rows.concat(_.range(1, this.state.items + 1).map(id => [{value: `Item ${id}`}, {value: groceryValue(id), component: component(id)}]))
    
    rows = rows.concat([[{readOnly: true, value: 'Total'}, {readOnly: true, value: `${total.toFixed(2)} $`}]])
    console.log(rows)
    return rows
  }

  componentWillMount () {
  }

  render () {
    const data = [
      {name: '09.01', uv: 0.12, pv: 0.1, amt: 0.7},
      {name: '09.02', uv: 0.22, pv: 0.2, amt: 0.6},
      {name: '09.03', uv: 0.42, pv: 0.3, amt: 0.5},
      {name: '09.04', uv: 0.44, pv: 0.4, amt: 0.4},
      {name: '09.05', uv: 0.54, pv: 0.5, amt: 0.3},
      {name: '09.06', uv: 0.51, pv: 0.6, amt: 0.2},
      {name: '09.07', uv: 0.41, pv: 0.7, amt: 0.1},
      {name: '09.07', uv: 0.60, pv: 0.7, amt: 0.1}
    ]
    const toPercent = (decimal, fixed = 0) => {
      return `${(decimal * 100).toFixed(fixed)}%`
    }
    return (
      <div className="main-container">
        <ReactDataSheet
          data={this.generateGrid()}
          valueRenderer={(cell) => cell.value}
          onChange={()=>{}}
        />
        <div className="chart-container">
          <h2 className="income">累计收益：40.21%</h2>
          <AreaChart width={700} height={300} data={data}
                margin={{top: 13, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name" tickLine={ false } padding={{ left: 0 }}
               axisLine={ false } tick={{ transform: 'translate(0, 10)', fill: '#fff' }} />
            <YAxis tickFormatter={toPercent} tickLine={ false } tickCount={7}
               axisLine={ false } tick={{ transform: 'translate(-6, 0)', fill: '#fff' }} />
            <CartesianGrid strokeDasharray="3 0" vertical={false} />
            <Tooltip/>
            <Area type='monotone' strokeWidth="7" dot={{ stroke: '#ff9300', r: 9, fillOpacity: 1, rFill: '#fff', fill: '#fff', strokeWidth: 5 }} stroke="#ff9300" dataKey='uv' fill='#ff9300' fillOpacity="0.4" />
          </AreaChart>
        </div>
      </div>
    )
  }
}
