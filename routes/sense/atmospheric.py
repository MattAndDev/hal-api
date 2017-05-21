# import
from sense_hat import SenseHat
import json
# init
sense = SenseHat()

# main
def main():
  # get temperature
  atmospheric = {
    'localTemperature': sense.get_temperature()
  }
  # atmospheric['temprature'] =
  json_data = json.dumps(atmospheric)
  print json.dumps(atmospheric, sort_keys=True,separators=(',',':'))

# Start process
if __name__ == '__main__':
  main()
