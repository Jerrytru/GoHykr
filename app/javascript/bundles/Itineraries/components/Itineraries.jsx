import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
import Search from './Search'
import DateSelector from './DateSelector'
import moment from 'moment'

export default class Itineraries extends Component {
  state = {
    itineraries: [],
    filteredItineraries: [],
  }

  fetchItineraries = () => {
    axios.get('/itineraries.json')
      .then(response => {
        const { itineraries } = response.data
        this.setState({ itineraries })
      })
  }

  handleSearch = value => {
    const searchText = value
    const regexp = RegExp(searchText, 'i')
    let { itineraries, filteredItineraries } = this.state
    if (searchText.trim() !== '') {
      filteredItineraries = itineraries.filter(itinerary => regexp.test(itinerary.properties.start_loc))
    } else {
      console.log("something went wrong")
    }
    this.setState({ filteredItineraries })
  }

  handleSelectDate = date => {
    const selectedDate = String(moment(date).format('YYYY-MM-DD'))
    let { filteredItineraries, itineraries } = this.state
    filteredItineraries = itineraries.filter(itinerary => itinerary.properties.start_date === selectedDate )
    this.setState({ filteredItineraries })
  }

  render() {
    const { filteredItineraries } = this.state
    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        <DateSelector selectDate={this.handleSelectDate} />
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Start date</th>
              <th style={{ width: '15%' }}>Due date</th>
              <th style={{ width: '15%' }}>Available seat</th>
              <th style={{ width: '15%' }}>ETA</th>
              <th style={{ width: '15%' }}>Start Loc</th>
              <th style={{ width: '15%' }}>End Loc</th>
              <th style={{ width: '15%' }}>Description</th>
              <th style={{ width: '15%' }}>Username</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredItineraries.map((itinerary, index) => {
                return <TableRow key={index} itinerary={itinerary.properties} />
              })
            }
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.fetchItineraries()
  }
}
