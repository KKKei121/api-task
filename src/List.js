import React from 'react'


class List extends React.Component {
  render() {
    return (

      <ul>
        {this.props.items.map(item => {
          return <div><li key={item}>{item}</li></div>
        })}
      </ul>
    )
  }
}

export default List
