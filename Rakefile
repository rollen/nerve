
task :angular => :update_angular
task :update_angular => [:compile_angular, :move_angular_files_into_framework] do

end

task :compile_angular do
  path_to_angular_rakefile = File.expand_path(__FILE__, "../lib/angular/Rakefile")
  system("rake -f #{path_to_angular_rakefile} compile") 
end

task :move_angular_files_into_framework do

end

