dir = ARGV[0]

Dir.glob("#{dir}/*.jpg") do |file|
  puts <<~IMG
    - url: #{file}
      image_path: #{file}
      title: ""
      alt: ""
  IMG
end
