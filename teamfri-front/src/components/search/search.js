import React from 'react'
import './search.scss'

class Search extends React.Component {
    constructor(props){
        super(props)

        this.state = {search: ''}
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value });
    }

    //render
    render() {
        const { handleSearch } = this.props
        const { search } = this.state

      return (
        <div className='search'>
            <input type="text" onChange={this.handleChange} value={search} className="form-control" placeholder='filtrar...' />
            <button onClick={handleSearch}><ion-icon name="search" ></ion-icon></button>
        </div>
      )
    }
}

export default Search