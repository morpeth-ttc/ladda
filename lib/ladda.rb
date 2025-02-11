require 'json'
require 'haml'
require 'debug'
  
class Ladda
  BLANK_DB = {'ranking' => [], 'history' => {}}
  
  def initialize(db)
    @db_path = db
    @db = JSON.parse(File.read(@db_path)) rescue nil
    @now = Time.now.utc
  end
  
  def dump_db
    print @db.to_json
  end
  
  def export_webpage
    template = Haml::Template.new(File.join(APP_ROOT, 'views', 'template.html.haml'))
    html = template.render(@db)
    File.write(File.join(APP_ROOT, 'public', 'index.html'), html)
  end
  
  def init_db
    @db = BLANK_DB.dup
    write_db
  end
  
  def add_player(name)
    fail "player \"#{name}\" already exists" if @db['history'].has_key?(name)
    @db['ranking'].push(name)
    @db['history'][name] = []
    write_db
  end
  
  def add_match(winner, loser)
    fail "player \"#{winner}\" doesn't exist" unless @db['history'].has_key?(winner)
    fail "player \"#{loser }\" doesn't exist" unless @db['history'].has_key?(loser)
    
    @db['history'][winner].unshift([@now, loser,  true])
    @db['history'][loser ].unshift([@now, winner, false])
    
    windex = @db['ranking'].index(winner)
    lindex = @db['ranking'].index(loser)
    
    if windex > lindex
      @db['ranking'].delete(winner)
      @db['ranking'].insert(lindex, winner)
    end
    
    write_db
  end
  
  private
  def write_db
    @db['updated'] = @now
    File.write(@db_path, @db.to_json)
  end
end