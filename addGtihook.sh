#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
./runAllTests.sh
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-commit