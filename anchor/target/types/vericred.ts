/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vericred.json`.
 */
export type Vericred = {
  "address": "BUnZHEsqHYAnE2k4qiEA93VXcMNqPz9a2e2tYjWct6AH",
  "metadata": {
    "name": "vericred",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vericred",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vericred",
      "discriminator": [
        97,
        211,
        231,
        172,
        79,
        29,
        108,
        148
      ]
    }
  ],
  "types": [
    {
      "name": "vericred",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cid",
            "type": "string"
          }
        ]
      }
    }
  ]
};
