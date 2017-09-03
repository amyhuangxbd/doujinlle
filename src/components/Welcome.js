import React, { Component } from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import ReactDataSheet from 'react-datasheet'
// Be sure to include styles at some point, probably during your bootstrapping 
import 'react-datasheet/lib/react-datasheet.css'
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
    this.state = {
      grocery: [],
      items: 3,
      grid: [
        [{readOnly: true, colSpan: 3, value: '兜金乐'}],
        [{readOnly: true, value: 1}, 
         { 
          value: '日期', 
          component: (
            <div className={'add-grocery'}> 日期 </div>
          ), 
          forceComponent: true
        },
        { 
          value: '收益', 
          component: (
            <div className={'add-grocery'}> 收益 
              <div className={'add-button'} onClick={this.addNewRow.bind(this)}> add item</div> 
            </div>
          ), 
          forceComponent: true
        }]
      ]
    }
  }l

  addNewRow () {
    let length = (this.state.grocery.length + 1)
    
    let arrayGrocery = this.state.grocery
    arrayGrocery.push({id: length, date: '', profit: ''})
    this.setState({
      grocery: arrayGrocery
    })
    let array = [{readOnly: true, value: length}, {value: this.groceryValue(length), component: this.customerComponent(length)}, {value: this.profitValue(length), component: this.customerProfitComponent(length)}]
    this.state.grid.push(array)
    console.log(this.state.grid)
  }

  groceryValue (id) {
    let idVal = ''
    for (var i = 0; i < this.state.grocery.length; i++) {
      if (this.state.grocery[i].id === id) {
        idVal = `${this.state.grocery[i].date}`
      }
    }
    return idVal || ''
    // if (this.state.grocery[id]) {
    //   const {label, value} = this.state.grocery[id]
    //   return `${label} (${value})`
    // } else {
    //   return ''
    // }
  }

  profitValue (id) {
    let idVal = ''
    for (var i = 0; i < this.state.grocery.length; i++) {
      if (this.state.grocery[i].id === id) {
        idVal = `${this.state.grocery[i].profit}`
      }
    }
    return idVal || ''
  }


  handleInputChange (id, evt) {
    let val = evt.target.value
    let array = this.state.grocery
    let number = 0
    for (var i = 0; i < this.state.grocery.length; i++) {
      if (this.state.grocery[i].id === id) {
        array[i].date = val
        number = i
      }
    }
    console.log(number)
    let arrayGrid = this.state.grid

    arrayGrid[number + 2][1].value = val
    this.setState({grid: arrayGrid})
    this.setState({grocery: array})
    console.log(this.state.grocery)

  }

  handleInputProfitChange (id, evt) {
    let val = evt.target.value
    let array = this.state.grocery
    let number = 0
    for (var i = 0; i < this.state.grocery.length; i++) {
      if (this.state.grocery[i].id === id) {
        array[i].profit = val
        number = i
      }
    }
    console.log(number)
    let arrayGrid = this.state.grid

    arrayGrid[number + 2][2].value = val
    this.setState({grid: arrayGrid})
    this.setState({grocery: array})
    console.log(this.state.grocery)

  }

  customerProfitComponent (id) {
    // return 'test'
    return <input type="number" step="0.01" value={this.state && this.state.grocery[id]} onChange={this.handleInputProfitChange.bind(this, id)} />
  }

  customerComponent (id) {
    // return 'test'
    return <input id="meeting" type="date" value={this.state && this.state.grocery[id]} onChange={this.handleInputChange.bind(this, id)} />
  }

  generateGrid () {

    let rows = [
      [{readOnly: true, colSpan: 3, value: 'Shopping List'}],
      [
        {readOnly: true, value: ''}, 
        { 
          value: '日期', 
          component: (
            <div className={'add-grocery'}> 日期 </div>
          ), 
          forceComponent: true
        },
        { 
          value: '收益', 
          component: (
            <div className={'add-grocery'}> 收益 
              <div className={'add-button'} onClick={()=>{console.log('add');this.setState({items: this.state.items + 1})}}> add item</div> 
            </div>
          ), 
          forceComponent: true
        }]
    ]
    rows = rows.concat(_.range(1, this.state.items + 1).map(id => [{readOnly: true, value: `${id}`}, {value: '1'}, {value: '1'}]))

    console.log(rows)
    return rows
  }

  handleExcelChange (modifiedCell, colI, rowJ, value) {
    console.log('change')
    console.log(rowJ)
    let array = this.state.grocery
    let arrayGrid = this.state.grid
    if (rowJ === 1) {
      arrayGrid[colI][1].value = value
      this.setState({grid: arrayGrid})
      array[colI - 2].date = value
      this.setState({grocery: array})
    }
    // let number = 0
    // for (var i = 0; i < this.state.grocery.length; i++) {
    //   if (this.state.grocery[i].id === id) {
    //     array[i].date = val
    //     number = i
    //   }
    // }
    // console.log(number)
    

    // arrayGrid[number + 2][1].value = val
    // this.setState({grid: arrayGrid})
    // this.setState({grocery: array})

    // this.setState({
    //   grid: this.state.grid.map((row) =>
    //     row.map((cell) =>
    //       (cell === modifiedCell) ? ({value: value}) : cell
    //     )
    //   )
    // })
  }

  handlePaste (array, e) {
    console.log(array)
  }

  handleContextMenu (event, cell, i, j) {
    console.log(cell)
    console.log(event)
    console.log(i)
    console.log(j)
  }

  componentWillMount () {
  }

  render () {
    const data = [
      {id: 1, date: '', profit: 0.3}, 
      {id: 2, date: '2017-09-14', profit: 0.5}, 
      {id: 3, date: '2017-09-02', profit: 0.2}, 
      {id: 4, date: '2017-09-22', profit: 0.8}]

    // const data = [
    //   {date: '09.01', profit: 0.12, pv: 0.1, amt: 0.7},
    //   {date: '09.02', profit: 0.22, pv: 0.2, amt: 0.6},
    //   {date: '09.03', profit: 0.42, pv: 0.3, amt: 0.5},
    //   {date: '09.04', profit: 0.44, pv: 0.4, amt: 0.4},
    //   {date: '09.05', profit: 0.54, pv: 0.5, amt: 0.3},
    //   {date: '09.06', profit: 0.51, pv: 0.6, amt: 0.2},
    //   {date: '09.07', profit: 0.41, pv: 0.7, amt: 0.1},
    //   {date: '09.07', profit: 0.60, pv: 0.7, amt: 0.1}
    // ]
    const toPercent = (decimal, fixed = 0) => {
      return `${(decimal * 100).toFixed(fixed)}%`
    }
    return (
      <div className="main-container">
        <ReactDataSheet
          ref="dataSheet"
          data={this.state.grid}
          valueRenderer={(cell) => cell.value}
          onChange={this.handleExcelChange.bind(this)}
          onContextMenu={this.handleContextMenu.bind(this)}
        />
        <div className="chart-container">
          <h2 className="income">累计收益：40.21%</h2>
          <AreaChart width={700} height={300} data={data}
                margin={{top: 13, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="date" tickLine={ false } padding={{ left: 0 }}
               axisLine={ false } tick={{ transform: 'translate(0, 10)', fill: '#fff' }} />
            <YAxis tickFormatter={toPercent} tickLine={ false } tickCount={7}
               axisLine={ false } tick={{ transform: 'translate(-6, 0)', fill: '#fff' }} />
            <CartesianGrid strokeDasharray="3 0" vertical={false} />
            <Tooltip/>
            <Area type='monotone' strokeWidth="7" dot={{ stroke: '#ff9300', r: 9, fillOpacity: 1, rFill: '#fff', fill: '#fff', strokeWidth: 5 }} stroke="#ff9300" dataKey='profit' fill='#ff9300' fillOpacity="0.4" />
          </AreaChart>
        </div>
      </div>
    )
  }
}
