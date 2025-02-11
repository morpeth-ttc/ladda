require 'spec_helper'

describe "Ladda" do
  let(:db_path) { File.join(APP_ROOT, 'tmp', 'data.json') }
  let(:ladda) { Ladda.new(db_path).tap { |l| l.class.instance_eval { attr_reader :db, :now } } }
  
  describe '#export_webpage' do
    # TODO
  end
  
  describe '#init_db' do
    it 'creates the db if it does not exist' do
      File.delete(db_path) if File.exist?(db_path)
      
      expect { ladda.init_db }.
      to change { File.exist?(db_path) }.
      from(false).to(true)
    end
    
    it 'resets the db to its initial state', fixtures: true do
      expect { ladda.init_db }.
      to change { ladda.db['ranking'].count }.
      from(13).to(0)
    end
  end
  
  describe '#add_player(name)', fixtures: true do
    it 'adds a player to the bottom of the ranking' do
      expect { ladda.add_player('Bulbasaur') }.
      to change { ladda.db['ranking'].last }.
      to('Bulbasaur')
    end
    
    it 'initializes the player match history' do
      expect { ladda.add_player('Bulbasaur') }.
      to change { ladda.db['history'].has_key?('Bulbasaur') }.
      from(false).to(true)
    end
    
    it 'errors if the player already exists' do
      expect { ladda.add_player('Pikachu') }.to raise_error('player "Pikachu" already exists')
    end
  end
  
  describe '#add_match(winner, loser)', fixtures: true do
    let(:higher) { 'Eevee' }     # 4
    let(:lower)  { 'Charizard' } # 7
    
    it 'adds to the history of both the winner and the loser' do
      ladda.add_match(lower, higher)
      expect(ladda.db['history'][lower ].first).to eq([ladda.now, higher, true])
      expect(ladda.db['history'][higher].first).to eq([ladda.now, lower, false])
    end
    
    context 'if the winner is ranked lower than the loser' do
      it "moves the winner to the loser's former rank" do
        expect { ladda.add_match(lower, higher) }.
        to change { ladda.db['ranking'].index(lower) }.
        from(6).to(3)
      end
      
      it "lowers the loser's rank by one" do
        expect { ladda.add_match(lower, higher) }.
        to change { ladda.db['ranking'].index(higher) }.
        from(3).to(4)
      end
    end
    
    context 'if the winner is ranked higher than the loser' do
      it 'does not change their ranking' do
        expect { ladda.add_match(higher, lower) }.
        not_to change { [ladda.db['ranking'].index(higher), ladda.db['ranking'].index(lower)]}
      end
    end
  end
end
