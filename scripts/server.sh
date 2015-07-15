#!/usr/bin/env ruby

require 'webrick'

root = File.expand_path(File.join(__dir__, '../public'))
server = WEBrick::HTTPServer.new(Port: 3000, DocumentRoot: root)

trap 'INT' do
    server.shutdown
end

server.start