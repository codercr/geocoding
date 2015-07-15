# geocoding
Geocoding sample

## Setup

1. install rvm
```bash
curl -sSL https://get.rvm.io | bash -s stable
```

2. install ruby
```bash
rvm install ruby-2.2.1
```

3. clone Geocoding repo
```bash
git clone https://github.com/codercr/geocoding.git
```

4. change to Geocoding repo
```bash
cd geocoding
```

5. install bundler
```bash
gem install bundler
```

6. run bundle install
```bash
bundle install
```

## Run specs
1. start jasmine server
```bash
rake jasmine
```

2. open web browser
```
http://localhost:8888/
```

## Run server
1. start jasmine server
```bash
scripts/server.sh
```

2. open web browser
```
http://localhost:3000/
```
