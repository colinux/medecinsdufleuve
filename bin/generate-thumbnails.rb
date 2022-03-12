mask = if ARGV.length == 1
         "#{ARGV[0]}/*.jpg"
       else
         ARGV
       end

Dir.glob(mask) do |file|
  next if file.end_with?('.thumb.jpg')

  file_thumb = file.gsub('.jpg', '.thumb.jpg')

  puts "Processing #{file}"

  # system("convert -define jpeg:size=500x180 #{file} -auto-orient -thumbnail 1280x480 -unsharp 0x.5 #{file_thumb}")
  system("convert -define jpeg #{file} -auto-orient -thumbnail 1280x480 -unsharp 0x.5 #{file_thumb}")
end
