# import
from sense_hat import SenseHat
import json
import sys

# init
sense = SenseHat()

# main
def main():

  # tell sense to show the provided message
  sense.show_message(
    sys.argv[1],
    0.1,
    text_colour=(255,255,255),
    back_colour=(0,0,0))
  sense.clear()

  # tell that we are done and what we printed
  result = {
    'done': 'true',
    'printed': sys.argv[1]
  }

  # return
  print json.dumps(result, sort_keys=True,separators=(',',':'))

# Start process
if __name__ == '__main__':
  main()
