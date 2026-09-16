#!/bin/bash
cd /webapps/ScannerApplication || {
        echo "Unable to change directories."
        exit 1
}

sudo git pull origin master || {
        echo "Unable to pull latest update."
        exit 1
}

sudo docker-compose down || {
        echo "Unable to stop body shop system container."
        exit 1
}

cd /webapps/ScannerApplication/frontend || {
        echo "Unable to change directories."
        exit 1
}

npm run build || {
        echo "Build attempt failed."
        exit 1
}

sudo mv dist build || {
        echo "Rename failed."
        exit 1
}

rm -rf /webapps/ScannerApplication/Backend/build || {
        echo "Unable to delete build folder."
        exit 1
}

mv build /webapps/ScannerApplication/Backend || {
        echo "Unable to overwrite build folder."
        exit 1
}

cd /webapps/ScannerApplication || {
        echo "Unable to change directories."
        exit 1
}

sudo docker-compose up --build -d || {
        echo "Unable to build and start body shop system container."
        exit 1
}

echo "The scanner application was rebuilt. The Docker container was started and is successfully serving the scanner application!"
exit 1
