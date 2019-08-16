import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

import {
  getAppointmentsOfMonth,
  getSurgeriesOfMonth,
  getPastAppointments,
  getPastSurgeries,
  getNps
} from './actions';

import { LineChart } from 'react-native-chart-kit'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class Dashboard extends Component {
  componentDidMount() {
    //const { user } = this.props;

    const user = {
      id: 'afe1e3bc-f8ac-4638-a635-9e050e46d84d',
    };

    this.props.getAppointmentsOfMonth(user.id);
    this.props.getSurgeriesOfMonth(user.id);
    this.props.getPastAppointments(user.id);
    this.props.getPastSurgeries(user.id);
    this.props.getNps(user.id);
  }

  printStar = (count) => {
    let arr = []

    for (let i = 0; i < count; i++) {
      arr[i] = <FontAwesomeIcon style={{ color: 'black' }} key={i} style={{ color: '#306680' }} icon={faStar} />
    }

    return arr
  }

  render() {
    const { appointmentsOfMonth } = this.props;
    const { surgeriesOfMonth } = this.props;
    const { pastAppointments } = this.props;
    const { pastSurgeries } = this.props;
    const { nps } = this.props;

    const appointmentData = pastAppointments.data.map(appointment => appointment.count);
    const monthAppointmentData = pastAppointments.data.map(surgery => surgery.month);

    const surgeryData = pastSurgeries.data.map(surgery => surgery.count);
    const monthSurgeryData = pastSurgeries.data.map(surgery => surgery.month);

    return (
      <ScrollView style={styles.dashboard}>
        <Text style={styles.title}>33 Care Dashboard</Text>

        <View style={styles.container}>

          <View style={styles.thisMonthContainer}>
            <View style={styles.thisMonthBox}>
              {
                appointmentsOfMonth.loading
                  ? <ActivityIndicator size="small" />
                  : <Text style={styles.thisMonthData}>{appointmentsOfMonth.data.count}</Text>
              }
              <Text style={styles.thisMonthDataLabel}>Consultas neste mês</Text>
            </View>

            <View style={styles.thisMonthBox}>
              {
                surgeriesOfMonth.loading
                  ? <ActivityIndicator size="small" />
                  : <Text style={styles.thisMonthData}>{surgeriesOfMonth.data.count}</Text>
              }
              <Text style={styles.thisMonthDataLabel}>Cirurgias neste mês</Text>
            </View>
          </View>


          <View style={styles.chartBox}>
            <Text style={styles.subtitle}>Consultas:</Text>
            {
              pastAppointments.loading
                ? <ActivityIndicator size="small" />
                :
                <View>
                  <View style={styles.chartView}>
                    <LineChart
                      data={{
                        labels: monthAppointmentData,
                        datasets: [{
                          data: appointmentData
                        }]
                      }}
                      width={(Dimensions.get('window').width)/1.2}
                      height={200}
                      chartConfig={{
                        backgroundGradientFrom: 'rgba(255, 255, 255, 0)',
                        backgroundGradientTo: 'rgba(255, 255, 255, 0)',
                        color: (opacity = 1) => `rgba(0, 0, 0, 0.5)`,
                        decimalPlaces: 0,
                      }}
                      bezier
                      style={{
                        marginHorizontal: -30,
                        marginTop: 20,
                      }}
                      fromZero
                    />
                  </View>
                </View>
            }
          </View>

          <View style={styles.chartBox}>
            <Text style={styles.subtitle}>Cirurgias: </Text>
            {
              pastSurgeries.loading
                ? <ActivityIndicator size="small" />
                :
                <View>
                  <View>
                    <LineChart
                      data={{
                        labels: monthSurgeryData,
                        datasets: [{
                          data: surgeryData
                        }]
                      }}
                      width={(Dimensions.get('window').width)/1.2}
                      height={200}
                      chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => 'rgba(0, 0, 0, 0.5)',
                        decimalPlaces: 0,
                      }}
                      bezier
                      style={{
                        marginHorizontal: -30,
                        marginTop: 20,
                        backgroundColor: 'rgba(0, 0, 0, 0)'
                      }}
                      fromZero
                    />
                  </View>

                </View>
            }
          </View>

          <View style={styles.chartBox}>
            <Text style={styles.subtitle}>Avaliações: </Text>
            {
              nps.loading
                ? <ActivityIndicator size="small" />
                : nps.data.map(item => (
                  <View key={item.id} style={styles.npsItemDirection} >
                    <Text style={styles.npsItem}>{item.title}: </Text>

                    <View style={styles.npsStars}>
                      {this.printStar(item.rating)}
                    </View>

                  </View>
                ))
            }
          </View>
        </View>
      </ScrollView >
    )
  }
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
    backgroundColor: '#306680',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 40,
    marginHorizontal: 20,
    fontFamily: 'Avenir-Black',
    color: '#30d1b6',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  container: {
    marginBottom: 70,
    flex: 4,
  },
  thisMonthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  thisMonthBox: {
    height: 100,
    paddingHorizontal: 27,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  thisMonthDataLabel: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: 'Avenir-Book',
    color: '#fff',
  },
  thisMonthData: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: 'Avenir-Heavy',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#306680',
    fontFamily: 'Avenir-Book',
  },
  chartBox: {
    flex: 1,
    padding: 30,
    marginBottom: 15,
    backgroundColor: '#F7FFF7',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginHorizontal: 20,
  },
  npsItem: {
    fontFamily: 'Avenir-Book',
    marginVertical: 5,
    fontSize: 15,
  },
  npsItemDirection: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  npsStars: {
    flexDirection: 'row',
    marginTop: 7,
  }
})

const mapStateToProps = state => ({
  user: state.auth.user,
  appointmentsOfMonth: state.dashboard.appointmentsOfMonth,
  surgeriesOfMonth: state.dashboard.surgeriesOfMonth,
  pastAppointments: state.dashboard.pastAppointments,
  pastSurgeries: state.dashboard.pastSurgeries,
  nps: state.dashboard.nps,
});

export default connect(mapStateToProps, { getAppointmentsOfMonth, getSurgeriesOfMonth, getPastAppointments, getPastSurgeries, getNps })(Dashboard);