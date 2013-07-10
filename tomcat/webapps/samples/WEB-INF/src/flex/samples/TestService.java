package flex.samples;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: abrod
 * Date: 7/10/13
 * Time: 7:54 AM
 * To change this template use File | Settings | File Templates.
 */
public class TestService {

    public Long echo(Long in) {
        System.out.println("Server received: " + in);
        return in;
    }

    public Long getU29() {
        return 289764372l;
    }
}
