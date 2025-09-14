## your hand is the music conductor; pixel values of the distance
### between thumb and each finger trigger different sounds and chords

bell = "/Users/nanditi/Documents/Music/SFX/one bell.wav"
peacock = "/Users/nanditi/Documents/Music/SFX/peacocks-far-trimmed.wav"
ghungroo = "/Users/nanditi/Documents/Music/SFX/Ghungroo Sample Pack/Ghungroo One Shot 14.wav"
hoof = "/Users/nanditi/Documents/Music/SFX/one horse hoof.wav"
gallop = "/Users/nanditi/Documents/Music/SFX/one horse gallop.wav"


#--------compressor------#
with_fx :level, amp: 0.85 do
  with_fx :compressor, threshold: 0.3, slope_above: 0.5, clamp_time: 0.01, relax_time: 0.1 do
    #--------compressor------#
    
    
    live_loop :osc_samples do
      use_real_time
      a, b, c, d = sync "/osc*/p5js"
      
      if d >= 30 and d < 80
        sample bell, amp: 1.8
        sleep 0.25
        sample bell, amp: 1.8
        sleep 0.5
      end
      
      if d >= 60 and d < 80
        sample peacock, finish: 0.3, decay: 0.2, amp: 1.5
        sleep 4
      end
      
      if b >= 50 and b < 90
        sample peacock, start: 0.3, decay: 0.2, amp: 1.5
        sleep 4
      end
      
      
      if d >= 80 and d < 100
        with_fx :gverb, mix: 0.1 do
          sample hoof, amp: 0.7
          sample gallop, amp: 1
          sleep 1
          sample hoof, amp: 0.7
          sample gallop, amp: 1
          sleep 1
          sample hoof, amp: 0.7
          sample gallop, amp: 1
          sleep 1
        end
      end
      
      if c >= 50 and c < 90
        sample ghungroo, amp: 0.5
        sleep 0.5
        sample ghungroo, amp: 0.5
        sleep 0.5
      end
      
      if d >= 100 and d < 140
        sample ghungroo, amp: 0.5
        sleep 0.5
      end
      
    end
    
    live_loop :osc_chords do
      use_real_time
      a, b, c, d = sync "/osc*/p5js"
      with_fx :ixi_techno, mix: 0.3 do
        
        if a >= 40 and a < 60
          play chord(:c3, :minor), lpf: 90, attack: 0.5, amp: 1.8
          sleep 0.25
        end
        
        if a >= 60 and a < 80
          play chord(:eb3, :major), lpf: 90, attack: 0.5, amp: 1.8
          sleep 0.25
        end
        
        if a >= 80 and a < 100
          play chord(:g3, :minor), lpf: 90, attack: 0.5, amp: 1.8
          sleep 0.25
        end
        
        if a >= 100 and a < 120
          play chord(:bb3, :major), lpf: 90, attack: 0.5, amp: 1.8
          sleep 0.25
        end
        
        if a >= 120 and a < 150
          play chord(:c4, :minor), lpf: 90, attack: 0.5, amp: 1.8
          sleep 0.25
        end
        
      end
    end
    
    
    chrd = [chord(:c3, :minor), chord(:eb3, :major), chord(:g3, :minor), chord(:bb3, :major)]
    live_loop :drone do
      use_real_time
      a, b, c, d = sync "/osc*/p5js"
      with_fx :ixi_techno, mix: 0.3 do
        play chord(:c3, :minor), lpf: 90, attack: 0.5, sustain: 1, amp: 0.3
        sleep 0.7
        
      end
    end
    
    live_loop :melody do
      use_real_time
      a, b, c, d = sync "/osc*/p5js"
      use_random_seed 45454
      use_synth :pluck
      use_synth_defaults release: 0.4, amp: 0.07
      with_fx :gverb, mix: 0.2 do
        with_fx :echo, mix: 0.3 do
          8.times do
            play ring(:c3, :d3, :f3, :g3, :bb3, :c4, :bb3, :g3, :f3, :d3, :g3, :eb3, :f3, :d3, :c3).tick
            play ring(:c3, :d3, :f3, :g3, :bb3, :c4, :bb3, :g3, :f3, :d3, :g3, :eb3, :f3, :d3, :c3).tick, pitch: +12
            sleep 0.25
          end
          
        end
      end
    end
    
    #--------compressor------#
  end
end
#--------compressor------#