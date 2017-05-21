# import
import picamera
import json
import sys
# init
camera = picamera.PiCamera()

# main
def main():
  camera.capture(sys.argv[1])
  # atmospheric['temprature'] =
  print json.dumps({'done': 'true'}, sort_keys=True,separators=(',',':'))

# Start process
if __name__ == '__main__':
  main()
