import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather'
import { API_KEY } from './utils/WeatherAPIKey'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error getting Weather Conditions'
        });
      }
    )
  }
  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
     .then(res => res.json())
     .then(json => {
      //  console.log("here's the weather:", json.main.temp);
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        isLoading: false
      })
     });
  }
  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
      { isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
      ) : (
        <Weather
            weather={this.state.weatherCondition}
            temperature={this.state.temperature} />
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
