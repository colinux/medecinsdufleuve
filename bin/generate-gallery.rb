mask = if ARGV.length == 1
         "#{ARGV[0]}/*.jpg"
       else
         ARGV
       end

Dir.glob(mask) do |file|
  next if file.end_with?('.thumb.jpg')

  puts <<~IMG
    - url: #{file}
      image_path: #{file.gsub('.jpg', '.thumb.jpg')}
  IMG
end
