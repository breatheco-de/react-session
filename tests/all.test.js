import {Session, defaultSession} from '../src/index.js';

const SESSION_LENGTH = 2000;
const EXPIRATION_LENGTH = 1000;

test('correct default session state', () => {
    const session = Session.start("sample-1");
    for (let key in defaultSession) expect(session[key]).toBe(defaultSession[key]);
});

test('session activates when started', () => {
    
    console.log("asasssss");
    Session.start('sample-2',{ 
        expiration: SESSION_LENGTH // in milliseconds, optional, defaults to 1 day
    });
    const session = Session.get();
    expect(session.active).toBe(true);
});

test('session changes are emmited and unsubscribed correctly', () => {
    
    const session = Session.start("sample-3");
    // listen to session changes
    const mockCallback = jest.fn(session => {});
    const unsubscribe = Session.onChange(mockCallback);

    Session.setPayload({});
    expect(mockCallback.mock.calls.length).toBe(1);
    
    unsubscribe();
    Session.setPayload({});
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('session payload is stored correctly', () => {
    
    const session = Session.start("sample-4");
    Session.setPayload({ 
    	username: 'alesanchezr',
    	gender: 'male'
    });
    const payload = Session.getPayload();
    expect(payload.username).toBe('alesanchezr');
    expect(payload.gender).toBe('male');
});

test('session expires correctly', () => {
    
    Session.start("sample-5",{ 
    	expiration: SESSION_LENGTH // in milliseconds, optional, defaults to 1 day
    });
    jest.useFakeTimers();
    var session = Session.get();
    expect(session.expired).toBe(false);

    // console.log("Trying to look for times", session);
    // fake that the session was created (SESSION_LENGTH + EXPIRATION_LENGTH) ago
    session.createdAt = new Date().getTime() - (SESSION_LENGTH + EXPIRATION_LENGTH);
    Session.store.setPersistedState(session);
    
    var session = Session.get();
    expect(session.expired).toBe(true);
    
});


test('session to destroy', () => {
    
    Session.start('sample-6', { 
    	expiration: SESSION_LENGTH // in milliseconds, optional, defaults to 1 day
    });

    Session.destroy();
    const session = Session.get();
    expect(session.active).toBe(false);
    expect(session.name).toBe("sample-6");
});

test('check for expiration callback', () => {
    
    jest.useFakeTimers();
    const mockCallback = jest.fn(session => {});
    
    Session.start('sample-7',{ 
    	expiration: SESSION_LENGTH // in milliseconds, optional, defaults to 1 day
    });
    console.log("session active now");
    Session.onExpiration(mockCallback);
    jest.runAllTimers();

    expect(mockCallback.mock.calls.length).toBe(1);
});