package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);

    //initialize the bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      add(GoogleAuth.class);
    }});
  }
}
