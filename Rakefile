require 'fileutils'

task :angular => :update_angular
task :update_angular => [:clone_angular_repo, :compile_angular, :move_angular_files_into_framework] do

end

task :compile_angular do

  path_to_angular_rakefile = File.expand_path("../lib/angular/", __FILE__)

  #cmd = "rake -f #{path_to_angular_rakefile} compile"
  #puts cmd
  Dir.chdir(path_to_angular_rakefile) do 
    system("rake compile")
  end
end

task :clone_angular_repo do
  system("git submodule update")
end

task :move_angular_files_into_framework do
  puts "Copying angular-scenario.js to framework ..."
  FileUtils.cp 'lib/angular/build/angular-scenario.js', 'framework/views/assets/angular-scenario.js'
  puts "Copying angular.js to framework ..."
  FileUtils.cp 'lib/angular/build/angular.js', 'framework/views/angular.js'
end

