mask = if ARGV.length == 1
         "#{ARGV[0]}/*.jpg"
       else
         ARGV
       end

Dir.glob(mask) do |file|
  puts <<~IMG
    - url: #{file}
      image_path: #{file}
      title: ""
      alt: ""
  IMG
end
