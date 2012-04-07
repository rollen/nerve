# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'cucumber' do
  watch(%r{^tests/features/.+\.feature$})
  watch(%r{^tests/features/support/.+$})          { 'features' }
  watch(%r{^tests/features/step_definitions/(.+)_steps\.rb$}) { |m| Dir[File.join("**/#{m[1]}.feature")][0] || 'features' }
end
