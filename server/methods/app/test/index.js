import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'test.get',
  validate: new SimpleSchema({}).validator(),
  run: function (data) {
    const { AstrologyService, AspectService, EphemerisJSONRepository, OrbJSONRepository, TrigonometricUtilities, HouseSystemFactory, TimeConversions, WorldTimezoneRepository, ZodiacFactory, GeodeticLocation, HouseSystemType, RetrogradesService } = require('@goldenius/hades-js')
    const moment = require('moment-timezone')

    let timeConversions = new TimeConversions()
    let retrogradesService = new RetrogradesService()
    let ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions, retrogradesService)
    let worldTimezoneRepository = new WorldTimezoneRepository()
    let orbRepository = new OrbJSONRepository()
    let aspectService = new AspectService(orbRepository)
    let trigonometricUtilities = new TrigonometricUtilities()
    let zodiacFactory = new ZodiacFactory()
    let houseSystemFactory = new HouseSystemFactory(trigonometricUtilities, zodiacFactory)

    let astrologyService = new AstrologyService(ephemerisJSONRepository, timeConversions, worldTimezoneRepository, aspectService, houseSystemFactory)

    let location = new GeodeticLocation('40.90', '29.21')
    let date = moment('1995-12-03 12:00:00')
    let timezone = 'Europe/Istanbul'

    function testPlanetCalculation() {
      return astrologyService.CalculateCelestialBodiesAndTime(date, timezone, location)
    }

    function testAspects(celestialBodies) {
      return astrologyService.CalculateAspects(celestialBodies)
    }

    function testHouseCalculation(houseSystemType) {
      return astrologyService.CalculateHouseSystem(houseSystemType, date, timezone, location)
    }

    let celestialBodiesAndTime = testPlanetCalculation()
    let calculatedAspects = testAspects(celestialBodiesAndTime.CelestialBodies)
    let calculatedHouses = testHouseCalculation(HouseSystemType.Placidus)

    return {
      celestialBodiesAndTime,
      calculatedAspects,
      calculatedHouses,
      link: getLink({ celestialBodiesAndTime, calculatedAspects, calculatedHouses }),
    }
  },
})

const getLink = ({ celestialBodiesAndTime, calculatedAspects, calculatedHouses }) => {
  const params = new URLSearchParams()
  params.set('fortune_seda', '1')
  params.set('fortune_asp', '1')
  params.set('chiron_asp', '1')
  params.set('lilith_asp', '1')
  params.set('uzel_asp', '1')
  params.set('dum_1_new', '296.85251630434')
  params.set('dum_10_new', '232.26283510696')
  params.set('no_domy', '1')
  params.set('dum_1', '0')
  params.set('dum_2', '30')
  params.set('dum_3', '60')
  params.set('dum_4', '90')
  params.set('dum_5', '120')
  params.set('dum_6', '150')
  params.set('pd_1', 'ANO')
  params.set('pd_9', 'ANO')
  params.set('pd_10', 'ANO')
  params.set('pd_12', 'ANO')
  params.set('planeta_slunce', '250.58805144687')
  params.set('planeta_luna', '28.1032586625')
  params.set('planeta_merkur', '256.16154734688')
  params.set('planeta_venuse', celestialBodiesAndTime.CelestialBodies[3].TotalDegree)
  params.set('planeta_mars', celestialBodiesAndTime.CelestialBodies[4].TotalDegree)
  params.set('planeta_jupiter', '262.94272097266')
  params.set('planeta_saturn', '348.11201796953')
  params.set('planeta_uran', '297.88164495078')
  params.set('planeta_neptun', '293.70575995156')
  params.set('planeta_pluto', '240.88937654062')
  params.set('planeta_uzel', '203.96056595938')
  params.set('planeta_lilith', '97.272374116406')
  params.set('planeta_chiron', '191.32428672187')
  params.set('planeta_fortune', '74.367723519965')
  params.set('r_uzel', 'ANO')
  params.set('tolerance', '1')
  params.set('tolerance_paral', '1.2')
  params.set('house_system', 'none')
  params.set('narozeni_den', '3')
  params.set('narozeni_mesic', '12')
  params.set('narozeni_rok', '1995')
  params.set('narozeni_hodina', '12')
  params.set('narozeni_minuta', '00')
  params.set('narozeni_mesto_hidden', "Manuel: °'N, °'E")
  params.set('narozeni_stat_hidden', '')
  params.set('narozeni_podstat_kratky_hidden', '')
  params.set('narozeni_city', 'Kartal')
  params.set('narozeni_sirka_stupne', '43')
  params.set('narozeni_sirka_minuty', '18')
  params.set('narozeni_sirka_smer', '0')
  params.set('narozeni_delka_stupne', '68')
  params.set('narozeni_delka_minuty', '15')
  params.set('narozeni_delka_smer', '0')
  params.set('narozeni_timezone_form', 'auto')
  params.set('narozeni_timezone_dst_form', 'auto')
  params.set('tvar_ukazat', '')

  return `https://horoscopes.astro-seek.com/horoscope-chart1__radix_3-12-1995_12-00.png?${params.toString()}`
}
