# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.provision "shell", inline: <<-SHELL
     curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
     apt-get install -y nodejs
   SHELL

end
