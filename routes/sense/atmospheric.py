# import
from sense_hat import SenseHat
# init
sense = SenseHat()

# main
def main():
  # get temperature
  tempertaure = sense.get_temperature()
  print temperature

# Start process
if __name__ == '__main__':
  main()
