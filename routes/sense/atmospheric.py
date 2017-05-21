# import
from sense_hat import SenseHat
import json
# init
sense = SenseHat()

# main
def main():
  # get temperature
  atmospheric = {
    'temperature': sense.get_temperature(),
    'humidity': sense.get_humidity(),
    'pressure': sense.get_pressure()
  }
  # atmospheric['temprature'] =
  json_data = json.dumps(atmospheric)
  print json.dumps(atmospheric, sort_keys=True,separators=(',',':'))

# Start process
if __name__ == '__main__':
  main()
