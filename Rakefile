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
  puts "Cloning Angular repo"
  system("git submodule update")
  system("cd lib/angular; git pull origin master")
end

def copy_to_framework(filename)
  puts "Copying #{filename} to framework ..."
  FileUtils.cp "lib/angular/build/#{filename}", "framework/application/views/assets/#{filename}"
end

task :move_angular_files_into_framework do
  path_to_angular_build = File.expand_path("../lib/angular/build", __FILE__)
  files = []
  Dir.chdir(path_to_angular_build) do
    Dir.foreach(path_to_angular_build) do |item| 
      File.file?(item) ? files << item : 'none' 
    end
  end

  files.each { |filename| copy_to_framework(filename) }
end

